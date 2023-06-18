import { z } from "zod";
import { v4 } from "uuid";

import zodWrapper from "util/zodWrapper";
import { withDatabase } from "clients/mongoose";

import User, { IUser } from "models/User";
import Group from "models/Group";
import { Document } from "mongoose";

const POSTValidator = z.string();

export type POST = z.infer<typeof POSTValidator>;

export const GET = withDatabase(
    zodWrapper(z.null(), z.object({}).strict(), POSTValidator, async () => {
        const users = await User.find({ lookingForGroup: true });

        if (users.length < 3) return "Not enough users";

        const userLookup: (Document & IUser)[] = [];

        const response = await fetch(process.env.CLUSTERING_URL as string, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_interests: users.map((elem) => {
                    userLookup.push(elem);
                    return elem.interests;
                }),
            }),
        });

        const groups: number[][] = await response.json();

        for (const group of groups) {
            const commonInterests: string[] = [];

            for (let i = 0; i < group.length; i++) {
                for (let j = i + 1; j < group.length; j++) {
                    const user1 = userLookup[group[i]];
                    const user2 = userLookup[group[j]];

                    commonInterests.push(
                        ...user1.interests.filter((value) =>
                            user2.interests.includes(value)
                        )
                    );
                }
            }

            await Group.create({
                _id: v4(),
                members: group.map((elem) => userLookup[elem].id),
                interests: [...new Set(commonInterests)],
            });
        }

        users.forEach(async (user) => {
            user.lookingForGroup = false;

            await user.save();
        });

        return "OK";
    })
);
