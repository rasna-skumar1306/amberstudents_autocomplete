import React from "react";
import Suggestion from "./suggestion.component";

const AutoComplete = ({ data, loading }) => {
	return (
		<div className="autocomplete">
			{data.length >= 1
				? data.map((place) => (
						<div key={place.id}>
							<Suggestion
								key={place.id}
								name={place.name}
								place={place.secondary_name ? place.secondary_name : place.name}
								country={
									place.location.country ? place.location.country : place.name
								}
								region_type={place.region_type}
								loading={loading}
							/>
						</div>
				  ))
				: null}
		</div>
	);
};

export default AutoComplete;
