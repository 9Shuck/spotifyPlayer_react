import React, { useEffect, useState } from "react";
import List from "./list.jsx";
import Button from "./button.jsx";

//create your first component
const Home = () => {
	//Declare state of array
	const [list, setList] = useState([]);
	const [currentSong, setCurrentSong] = useState(
		"files/mario/songs/castle.mp3"
	);
	const [currentTitleSong, setCurrentTitleSong] = useState("Mario Castle");
	const [currentIndexSong, setCurrentIndexSong] = useState(1);

	//Declare url of the API
	let url = "https://assets.breatheco.de/apis/sound/songs";
	//Declare empty array of list of songs
	let save = [];
	useEffect(() => {
		//Download API songs
		fetch(url, { method: "GET" })
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(songsJson => {
				// Do stuff with the JSON
				setList(songsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);
	//Loop for creating each song depending on the list.length
	for (let i = 0; i < list.length; i++) {
		save.push(
			<li>
				<List
					name={list[i].name}
					key={i.toString()}
					url={list[i].url}
					play={() => {
						setCurrentSong(list[i].url);
						setCurrentTitleSong(list[i].name);
						setCurrentIndexSong(i);
					}}
				/>
			</li>
		);
	}
	const Player = () => {
		return (
			<figure>
				<figcaption>
					<h4>
						<p>Playing {currentTitleSong}</p>
					</h4>
				</figcaption>
				<audio
					controls
					autoPlay
					src={"https://assets.breatheco.de/apis/sound/".concat(
						currentSong
					)}>
					Your browser does not support the
					<code>audio</code> element.
				</audio>
			</figure>
		);
	};

	return (
		<div className="container text-center mt-3">
			<h1>PLAYLIST 🎧</h1>
			<ul>{save}</ul>
			<ul>
				<Player />
				<div className="containerButton">
					<button
						className="btn btn-light"
						onClick={() => {
							if (currentIndexSong != 0) {
								setCurrentSong(list[currentIndexSong - 1].url);
								setCurrentIndexSong(currentIndexSong - 1);
								setCurrentTitleSong(
									list[currentIndexSong - 1].name
								);
							} else {
								setCurrentSong(list[list.length - 1].url);
								setCurrentIndexSong(list.length - 1);
								setCurrentTitleSong(list[list.length - 1].name);
							}
						}}>
						<i className="fas fa-backward"></i>
					</button>
					<button
						className="btn btn-light"
						onClick={() => {
							if (currentIndexSong != list.length - 1) {
								setCurrentSong(list[currentIndexSong + 1].url);
								setCurrentIndexSong(currentIndexSong + 1);
								setCurrentTitleSong(
									list[currentIndexSong + 1].name
								);
							} else {
								setCurrentSong(list[0].url);
								setCurrentIndexSong(0);
								setCurrentTitleSong(list[0].name);
							}
						}}>
						<i className="fas fa-forward"></i>
					</button>
				</div>
			</ul>
		</div>
	);
};

export default Home;
