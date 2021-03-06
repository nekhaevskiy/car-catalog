import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select
} from "@material-ui/core";
import React from "react";
import { apiUrl, Colors, Manufacturers } from "../../api";
import { State, useFetch } from "../../hooks/useFetch";
import styles from "./styles.module.css";

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
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  disabled: boolean;
}

function Filter({ filter, onFilterChange, disabled, ...rest }: Props) {
  const classes = useStyles();
  const [color, setColor] = React.useState(() => filter.color);
  const [manufacturer, setManufacturer] = React.useState(
    () => filter.manufacturer
  );
  const { state: colorsState, result: colorsResult } = useFetch<Colors>(
    apiUrl.colors
  );
  const {
    state: manufacturersState,
    result: manufacturersResult
  } = useFetch<Manufacturers>(apiUrl.manufacturers);

  const changeColor = (event: React.ChangeEvent<{ value: unknown }>) => {
    setColor(event.target.value as string);
  };

  const changeManufacturer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setManufacturer(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (color !== filter.color || manufacturer !== filter.manufacturer) {
      const filter = {
        color,
        manufacturer
      };
      onFilterChange(filter);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} {...rest}>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        disabled={colorsState !== State.Resolved}
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
          {colorsResult?.colors.map((color) => (
            <MenuItem value={color} key={color}>
              {color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        variant="outlined"
        className={classes.formControl}
        disabled={manufacturersState !== State.Resolved}
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
          {manufacturersResult?.manufacturers.map((manufacturer) => (
            <MenuItem value={manufacturer.name} key={manufacturer.name}>
              {manufacturer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className={styles.buttonWrapper}>
        <button disabled={disabled}>Filter</button>
      </div>
    </form>
  );
}

export { Filter, initialFilter };
export type { FilterState };
