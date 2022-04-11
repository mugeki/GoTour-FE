import Layout from "../../components/layout";
import dataMock from '../../mockPlaces.json';
import CardExplore from "../../components/elements/cardExplore";
import { generateAxiosConfig, isLoggedIn } from "../../utils/helper";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Wishlist() {
    const [data, setData] = useState([]);

    useEffect(() => {
		axios.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
			.then(res => {
				setData(res.data.data);
			})
			.catch(err => {
				console.log(err);
                // alert(err.res.data.meta.message);
                alert(JSON.stringify(err.res.data));
			})
	}, []);

    return (
        <Layout>
            <main className="px-10 py-10">
                <h1 className="font-bold text-2xl md:text-3xl mb-4">
                    My Wishlist
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
                                isWishlishted={true}
                            />
                        </div>
                    ))}
                </div>
            </main>
        </Layout>
    )
}