import { Autocomplete, Chip } from "@mui/joy";
import React from "react";

import CloseIcon from "@mui/icons-material/Close";

function InterestSelector({
    value,
    onChange,
}: {
    value?: string[];
    onChange?: (newValue: string[]) => void;
}) {
    const [interests, setInterests] = React.useState<string[]>([]);
    const [interestList, setInterestList] = React.useState<string[]>([]);
    const [loadingInterestList, setLoadingInterestList] = React.useState(true);
    const [autocompleteOpen, setAutocompleteOpen] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            if (autocompleteOpen && interests.length === 0) {
                setInterestList(await (await fetch("/api/interests")).json());

                setLoadingInterestList(false);
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autocompleteOpen]);

    React.useEffect(() => {
        if (onChange && !value) onChange(interests);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interests]);

    return (
        <Autocomplete
            multiple
            className="w-full text-white hover:text-white bg-gray-800 focus:outline-none"
            options={interestList}
            loading={loadingInterestList}
            onOpen={() => setAutocompleteOpen(true)}
            onClose={() => setAutocompleteOpen(false)}
            placeholder="Interests"
            sx={{
                "& .MuiAutocomplete-input": {
                    outline: "none",
                },
            }}
            value={value || interests}
            onChange={
                !value
                    ? (_, value) => setInterests(value)
                    : (_, value) => onChange && onChange(value)
            }
            renderTags={(tags, getTagProps) =>
                tags.map((item, index) => (
                    <>
                        {/* eslint-disable-next-line react/jsx-key */}
                        <Chip
                            variant="solid"
                            color="primary"
                            endDecorator={
                                <CloseIcon fontSize="small" className="" />
                            }
                            {...getTagProps({ index })}
                        >
                            {item}
                        </Chip>
                    </>
                ))
            }
        />
    );
}

export default InterestSelector;
