"use client";
import React from "react";
import { Autocomplete, Button, Chip } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";

const testInterests = [
    "Photography",
    "Hiking",
    "Painting",
    "Playing guitar",
    "Cooking",
    "Gardening",
    "Writing poetry",
    "Sculpting",
    "Yoga",
    "Dancing",
    "Reading",
    "Knitting",
    "Singing",
    "Chess",
    "Swimming",
    "Woodworking",
    "Playing video games",
    "Meditation",
    "Soccer",
    "Drawing",
    "Birdwatching",
    "Cycling",
    "Calligraphy",
    "Playing basketball",
    "Pottery",
    "Fishing",
    "Collecting stamps",
    "Photomanipulation",
    "Baking",
    "Rock climbing",
    "Listening to music",
    "Camping",
    "Origami",
    "Playing tennis",
    "Coin collecting",
    "Golfing",
    "Embroidery",
    "Playing piano",
    "Scrapbooking",
    "Writing short stories",
    "Model building",
    "Running",
    "Skydiving",
    "Coin magic",
    "Astrology",
    "Skywatching",
    "Badminton",
    "Volunteering",
    "Astrophotography",
    "Sewing",
    "Surfing",
    "Stand-up comedy",
    "Chessboxing",
    "Ice skating",
    "Archery",
    "Juggling",
    "Taekwondo",
    "Salsa dancing",
    "Writing songs",
    "Traveling",
    "Candle making",
    "Collecting vinyl records",
    "Metal detecting",
    "Parkour",
    "Magic tricks",
    "Beekeeping",
    "Genealogy",
    "Cosplay",
    "Paintball",
    "Astrobiology",
    "Quilting",
    "Film photography",
    "Graffiti art",
    "Amateur radio",
    "Belly dancing",
    "Bonsai gardening",
    "Bungee jumping",
    "Photobombing",
    "Cryptography",
    "Geocaching",
    "Playing board games",
    "Writing code",
    "Playing ukulele",
    "Ice cream making",
    "Writing letters",
    "Trekking",
    "Frisbee golf",
    "Jigsaw puzzles",
    "Cardistry",
    "Wakeboarding",
    "Astronomy",
    "Virtual reality gaming",
    "Soap making",
    "Ultimate Frisbee",
    "Speedcubing",
    "Silk painting",
    "Powerlifting",
    "Martial arts",
    "Metalworking",
    "Aerial yoga",
    "LARPing",
    "Kiteboarding",
    "Cryptocurrency trading",
    "Astrocartography",
    "Breakdancing",
    "Magic the Gathering",
    "Robotics",
    "Rope skipping",
    "Wine tasting",
    "Paper mache",
    "Feng shui",
    "Bodybuilding",
    "Graffiti",
    "Playing harmonica",
    "Wood carving",
    "Mixology",
    "Jewelry making",
    "Basket weaving",
    "Rug hooking",
    "Foraging",
    "Ballet",
    "Foreign language learning",
    "Collecting seashells",
    "Dog training",
    "Scuba diving",
    "Surf fishing",
    "Horseback riding",
    "Paddleboarding",
    "Paragliding",
    "Skiing",
    "Hula hooping",
    "Karaoke",
    "Sudoku",
    "Paper folding",
    "Beer brewing",
    "Ice hockey",
    "Comic book collecting",
    "Astrogeology",
    "Baking bread",
    "Cartooning",
    "Astronautics",
    "Film production",
    "Whittling",
    "Glassblowing",
    "DJing",
    "Indoor gardening",
    "Lacrosse",
    "Cross-stitching",
    "Windsurfing",
    "Digital art",
    "Orienteering",
    "Car restoration",
    "Playing accordion",
    "Lock picking",
    "Aerial photography",
    "Ceramics",
    "Shuffleboard",
    "Amateur astronomy",
    "Bird photography",
    "Architectural photography",
    "Tea tasting",
    "Rollerblading",
    "Poetry writing",
    "Mosaic art",
    "Freestyle rapping",
    "Creative writing",
    "Aromatherapy",
    "Beachcombing",
    "Mountaineering",
    "Rugby",
    "Karate",
    "Piano playing",
    "Photogrammetry",
    "Kite flying",
    "Blogging",
    "Curling",
    "Climbing trees",
    "Watercolor painting",
];

export default function OnboardingPage() {
    const [interests, setInterests] = React.useState<string[]>([]);

    return (
        <>
            <div className="bg-zinc-950 h-[100vh] flex justify-center items-center">
                <div className="bg-gray-900 rounded-lg w-full h-full max-w-[450px] max-h-[550px] p-2.5 flex flex-col items-center justify-between gap-2">
                    <div className="bg-gray-800 text-white w-full rounded-lg p-3.5 justify-center flex text-center tracking-tight text-xl">
                        Select your interests from the list
                    </div>
                    <div className="bg-gray-800 h-full w-full rounded-lg p-2.5 flex flex-col gap-4 justify-center">
                        <Autocomplete
                            multiple
                            className="w-full text-white hover:text-white bg-gray-800 focus:outline-none"
                            options={testInterests}
                            placeholder="Interests"
                            sx={{
                                "& .MuiAutocomplete-input": {
                                    outline: "none",
                                },
                            }}
                            value={interests}
                            onChange={(event, value) => setInterests(value)}
                            renderTags={(tags, getTagProps) =>
                                tags.map((item, index) => (
                                    <>
                                        {/* eslint-disable-next-line react/jsx-key */}
                                        <Chip
                                            variant="solid"
                                            color="primary"
                                            endDecorator={
                                                <CloseIcon
                                                    fontSize="small"
                                                    className=""
                                                />
                                            }
                                            {...getTagProps({ index })}
                                        >
                                            {item}
                                        </Chip>
                                    </>
                                ))
                            }
                        />

                        <Button
                            variant="solid"
                            onClick={async () => {
                                const response = await fetch("/api/user", {
                                    method: "POST",
                                    body: JSON.stringify({ interests }),
                                });

                                console.log(await response.json());
                            }}
                        >
                            Create user
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
