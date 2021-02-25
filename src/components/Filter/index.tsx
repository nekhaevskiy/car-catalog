import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select
} from "@material-ui/core";
import React from "react";
import styles from "./Filter.module.css";

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: "100%",
      marginBottom: 24
    },
    select: {
      width: "100%"
    }
  })
);

interface FilterState {
  color: string;
  manufacturer: string;
}

const initialFilter: FilterState = {
  color: "all colors",
  manufacturer: "all manufacturers"
};

interface Props {
  onFilterChange: (filter: FilterState) => void;
  colors?: string[];
  manufacturers?: string[];
}

function Filter({ colors = [], manufacturers = [], onFilterChange }: Props) {
  const classes = useStyles();
  const [color, setColor] = React.useState(initialFilter.color);
  const [manufacturer, setManufacturer] = React.useState(
    initialFilter.manufacturer
  );

  const changeColor = (event: React.ChangeEvent<{ value: unknown }>) => {
    setColor(event.target.value as string);
  };

  const changeManufacturer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setManufacturer(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const filter = {
      color,
      manufacturer
    };
    onFilterChange(filter);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* TODO: Update select to match the original design */}
        <FormControl
          variant="outlined"
          className={classes.formControl}
          disabled={colors.length === 0}
        >
          <InputLabel id="select-color-label">Color</InputLabel>
          <Select
            labelId="select-color-label"
            id="select-color"
            value={color}
            onChange={changeColor}
            label="Color"
            className={classes.select}
            data-testid="select-color"
          >
            <MenuItem value={initialFilter.color}>
              <em>All car colors</em>
            </MenuItem>
            {colors.map((color) => (
              <MenuItem value={color} key={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          className={classes.formControl}
          disabled={manufacturers.length === 0}
        >
          <InputLabel id="select-manufacturer-label">Manufacturer</InputLabel>
          <Select
            labelId="select-manufacturer-label"
            id="select-manufacturer"
            value={manufacturer}
            onChange={changeManufacturer}
            label="Manufacturer"
            className={classes.select}
            data-testid="select-manufacturer"
          >
            <MenuItem value={initialFilter.manufacturer}>
              <em>All manufacturers</em>
            </MenuItem>
            {manufacturers.map((manufacturer) => (
              <MenuItem value={manufacturer} key={manufacturer}>
                {manufacturer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className={styles.buttonWrapper}>
          {/* TODO: Disable button while loading is in progress */}
          <button>Filter</button>
        </div>
      </form>
    </>
  );
}

export { Filter, initialFilter };
export type { FilterState };
