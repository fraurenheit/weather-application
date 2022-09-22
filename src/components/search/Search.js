import axios from "axios";
import React, { useContext } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import SearchContext from "../../context/SearchContext";

function Search() {
  const { setCity } = useContext(SearchContext);

  const ayar = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    headers: {
      "X-RapidAPI-Key": "4019612f98msh79acfaf515dd398p156a92jsnad89244c6d47",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  const loadOptions = (inputValue) => {
    return axios
      .request(ayar, (ayar.params = { namePrefix: `${inputValue}` }))
      .then((response) => {
        return {
          options: response.data.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((error) => console.log(error));
  };

  const onChangeHandler = (value) => {
    setCity(value);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
}

export default Search;
