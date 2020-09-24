import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AutoComplete from "./autocomplete.component";
import { Button, Input, Layout } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";
import "./App.scss";

const { Header, Content } = Layout;

function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [display, setDisplay] = useState(false);
	const wrapper = useRef(null);
	const isGreater = searchTerm.length >= 3 ? true : false;
	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			const res = await axios.get(
				`https://base.amberstudent.com/api/v0/regions?sort_key=search_name&sort_order=desc&states=active&search_name=${searchTerm}`
			);
			setLoading(false);
			setSearchData(res.data.data.result);
			console.log(res.data.data.result);
		};
		getData();
		//eslint-disable-next-line
	}, [isGreater && searchTerm]);

	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const handleOutsideClick = (e) => {
		const { current: wrap } = wrapper;
		if (wrap && !wrap.contains(e.target)) {
			setDisplay(false);
		}
	};

	return (
		<div ref={wrapper} className="App">
			<Layout>
				<Header className="app__header">
					<img
						src="https://static-assets-amberstudent.imgix.net/images/logo/amber_logo_full.png"
						alt="logo"
						className="header__image"
					/>
					<h1 className="header">Search Box</h1>
				</Header>
				<Content className="app__content">
					<div className="app__inputContents">
						<Input
							name="app__search"
							className="app__input"
							placeholder="Search here!...."
							size="large"
							value={searchTerm}
							allowClear
							autoComplete="false"
							onChange={(e) => {
								setSearchTerm(e.target.value);
								setDisplay(true);
								if (searchTerm.length <= 1) {
									setDisplay(false);
								}
							}}
						/>
						<Button className="app__btn" icon={<SearchOutlined />}>
							Search
						</Button>
					</div>

					{searchData.length >= 1 && isGreater && display ? (
						<AutoComplete data={searchData.slice(0, 6)} loading={loading} />
					) : (
						searchTerm.length < 3 && (
							<div className="app_isGreaterInfo">
								Enter {`${3 - searchTerm.length}`} more characters to search
							</div>
						)
					)}
				</Content>
			</Layout>
		</div>
	);
}

export default App;
