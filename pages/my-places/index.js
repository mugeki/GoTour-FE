import Layout from "../../components/layout";
import dataMock from '../../mockPlaces.json';
import CardExplore from "../../components/elements/cardExplore";
import { generateAxiosConfig } from "../../utils/helper";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MyPlaces() {
    const [data, setData] = useState([]);

    useEffect(() => {
		axios.get(`${process.env.BE_API_URL}/my-places`, generateAxiosConfig())
			.then(response => {
				setData(response.data);
			})
			.catch(err => {
				console.log(err);
                // alert(err.response.data.meta.message);
                alert(JSON.stringify(err.response.data));
			})
	}, []);

    return (
        <Layout>
            <main className="px-10 py-10">
                <h1 className="font-bold text-2xl md:text-3xl mb-4">
                    My Places
                </h1>
                <div className="flex flex-row flex-wrap">
                    {data.map((item, i) => (
                        <div key={i} className="w-full sm:w-auto sm:mr-5 mb-10">
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
            </main>
        </Layout>
    )
}