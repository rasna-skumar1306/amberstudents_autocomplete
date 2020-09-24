import React, { useState } from "react";
import { Card, Skeleton, Tooltip } from "antd";
import Modal from "antd/lib/modal/Modal";

const { Meta } = Card;

const Suggestion = ({ name, country, place, region_type, loading }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className="suggestion">
				<Skeleton active loading={loading}>
					<Tooltip title={`${name} is a ${region_type}`} placement="left">
						<Card
							hoverable
							bordered="false"
							onClick={() => setShowModal(!showModal)}
						>
							<Meta
								avatar={
									region_type === "establishment" ? (
										<i className="fas fa-university" />
									) : (
										<i className="far fa-compass" />
									)
								}
								title={<h4 className="suggestion__place">{name}</h4>}
								description={place}
							/>
						</Card>
					</Tooltip>
				</Skeleton>
			</div>
			<Modal visible={showModal} onOk={() => setShowModal(!showModal)}>
				<h3>{name}</h3>
				<p>
					It is an {region_type}{" "}
					{`${region_type === "establishment" ? `present in` : ""}`}
					<br />
					{place}
				</p>
			</Modal>
		</>
	);
};

export default Suggestion;
