import Layout from "../../components/layout";
import SearchEngine from "../../components/elements/searchEngine";
import CardExplore from "../../components/elements/cardExplore";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Explore() {
    const [data, setData] = useState([]);

    useEffect(() => {
		axios.get(`http://127.0.0.1:8000/api/place`)
			.then(response => {
				setData(response.data.data);
				console.log("Data:", response.data.data);
			})
			.catch(err => {
				console.log(err);
			})
	}, []);

    return (
        <Layout>
            <main className="px-10 py-10">
                <h1 className="font-bold text-2xl md:text-3xl mb-4">
                    Explore Places
                </h1>
                <div className="flex flex-col lg:flex-row items-start">
                    <div className="w-full mb-10 lg:w-1/4">
                        <SearchEngine />
                    </div>
                    <div className="lg:w-3/4 flex flex-row flex-wrap justify-center">
                        {data.map((item, i) => (
                            <div key={i} className="w-full sm:w-auto sm:mx-5 mb-10">
                                <CardExplore                                    
                                    id={item.id}                                    
                                    name={item.name}
                                    location={item.location}
                                    rating={item.rating}
                                    img_urls={item.img_urls[0]}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
		</Layout>
    )
}