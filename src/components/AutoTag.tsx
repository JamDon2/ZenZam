import * as React from "react";
import useAutocomplete, {
    AutocompleteGetTagProps,
} from "@mui/base/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";

const Root = styled("div")(
    ({ theme }) => `
  color: ${
      theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.65)"
          : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const Label = styled("label")`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
`;

const InputWrapper = styled("div")(
    ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
        theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.65)"
            : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

// const lightColors = [
//     "#FADBD8", // light red
//     "#FDEDEC", // light pink
//     "#D6EAF8", // light blue
//     "#FEF9E7", // light yellow
//     "#E8F6F3", // light green
// ];

// const randomColor = lightColors[Math.floor(Math.random() * lightColors.length)];

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}

function AutoTag(props: TagProps) {
    const { label, onDelete, ...other } = props;
    return (
        <div {...other}>
            <span className="rounded-lg px-1.5 py-0.5">{label}</span>
            <CloseIcon
                fontSize="large"
                className="!text-[17px]"
                onClick={onDelete}
            />
        </div>
    );
}

const StyledTag = styled(AutoTag)<TagProps>(
    ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
      theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
    ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export default function CustomizedHook() {
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: "customized-hook-demo",
        defaultValue: [],
        multiple: true,
        options: topics,
        getOptionLabel: (option) => option.topic,
    });

    return (
        <Root>
            <div {...getRootProps()}>
                <Label className="italic p-1" {...getInputLabelProps()}>
                    Enter Tags...
                </Label>
                <InputWrapper
                    ref={setAnchorEl}
                    className={focused ? "focused w-full" : "w-full"}
                >
                    {value.map((option: FilmOptionType, index: number) => (
                        <div key={index}>
                            <StyledTag
                                label={option.topic}
                                {...getTagProps({ index })}
                            />
                        </div>
                    ))}
                    <input {...getInputProps()} />
                </InputWrapper>
            </div>
            {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                    {(groupedOptions as typeof topics).map((option, index) => (
                        <li key={index} {...getOptionProps({ option, index })}>
                            <span>{option.topic}</span>
                            <CheckIcon fontSize="small" />
                        </li>
                    ))}
                </Listbox>
            ) : null}
        </Root>
    );
}

interface FilmOptionType {
    topic: string;
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const topics = [
    { topic: "soccer" },
    { topic: "reading" },
    { topic: "basketball" },
    { topic: "soccer" },
    { topic: "reading" },
    { topic: "basketball" },
    { topic: "painting" },
    { topic: "cooking" },
    { topic: "music" },
    { topic: "science" },
    { topic: "travel" },
    { topic: "photography" },
    { topic: "history" },
    { topic: "technology" },
    { topic: "fitness" },
    { topic: "gaming" },
    { topic: "movies" },
    { topic: "fashion" },
    { topic: "writing" },
    { topic: "nature" },
    { topic: "astronomy" },
    { topic: "politics" },
    { topic: "philosophy" },
    { topic: "food" },
    { topic: "art" },
    { topic: "yoga" },
    { topic: "dance" },
    { topic: "meditation" },
    { topic: "environment" },
    { topic: "cars" },
    { topic: "animals" },
    { topic: "architecture" },
    { topic: "business" },
    { topic: "comedy" },
    { topic: "education" },
    { topic: "finance" },
    { topic: "health" },
    { topic: "parenting" },
    { topic: "science fiction" },
    { topic: "fantasy" },
    { topic: "technology" },
    { topic: "design" },
    { topic: "photography" },
    { topic: "cooking" },
    { topic: "gardening" },
    { topic: "travel" },
    { topic: "history" },
    { topic: "sports" },
    { topic: "music" },
    { topic: "literature" },
    { topic: "psychology" },
    { topic: "beauty" },
    { topic: "diy" },
    { topic: "programming" },
    { topic: "mathematics" },
    { topic: "marketing" },
    { topic: "fashion" },
    { topic: "sustainability" },
    { topic: "culinary" },
    { topic: "fitness" },
    { topic: "video games" },
    { topic: "film making" },
    { topic: "traveling" },
    { topic: "interior design" },
    { topic: "cycling" },
    { topic: "spirituality" },
    { topic: "motivation" },
    { topic: "volunteering" },
    { topic: "social media" },
    { topic: "television" },
    { topic: "drama" },
    { topic: "coaching" },
    { topic: "parenting" },
    { topic: "writing" },
    { topic: "self-improvement" },
    { topic: "philanthropy" },
    { topic: "sculpture" },
    { topic: "comic books" },
    { topic: "archaeology" },
    { topic: "poetry" },
    { topic: "jewelry making" },
    { topic: "drawing" },
    { topic: "board games" },
    { topic: "public speaking" },
];
