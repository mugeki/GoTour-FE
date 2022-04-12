import Layout from "../../components/layout";
import SearchEngine from "../../components/elements/searchEngine";
import CardExplore from "../../components/elements/cardExplore";
import { useState, useEffect } from "react";
import axios from "axios";
import { generateAxiosConfig, isLoggedIn } from "../../utils/helper";

export default function Explore() {
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [sortBy, setsortBy] = useState("");

    useEffect(() => {
		axios.get(`${process.env.BE_API_URL}/place`)
			.then(res => {
                if (isLoggedIn()) {
                    axios.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
                        .then(resWishlist => {
                            const wishlistedPlaces = resWishlist.data.data;
                            const resWithWishlist = res.data.data.data.map((place) => {
                                return {
                                    ...place,
                                    wishlist: wishlistedPlaces.some(e => e.id === place.id),
                                }
                            })
                            setData(resWithWishlist);
                        })
                        .catch(err => {
                            console.log(err);
                            alert(JSON.stringify(err.res.data));
                        })
				} else {
					setData(res.data.data.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
        
    const handleSearchSubmit = (keywordSubmit, sortBySubmit) => {
        setKeyword(keywordSubmit);
        setsortBy(sortBySubmit);
        axios.get(`${process.env.BE_API_URL}/place?keyword=${keywordSubmit}&sort_by=${sortBySubmit}`)
			.then(res => {
                if (isLoggedIn()) {
                    axios.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
                        .then(resWishlist => {
                            const wishlistedPlaces = resWishlist.data.data;
                            const resWithWishlist = res.data.data.data.map((place) => {
                                return {
                                    ...place,
                                    wishlist: wishlistedPlaces.some(e => e.id === place.id),
                                }
                            })
                            console.log("56: resWithWishlist", resWithWishlist)
                            setData(resWithWishlist);
                        })
                        .catch(err => {
                            console.log(err);
                            alert(JSON.stringify(err.res.data));
                        })
				} else {
					setData(res.data.data.data);
				}
			})
			.catch(err => {
				console.log("err", err);
			})
    }

    const handleLoadMore = () => {
        axios.get(`${process.env.BE_API_URL}/place?page=${data.length/9 + 1}&keyword=${keyword}&sort_by=${sortBy}`)
			.then(res => {
                if (isLoggedIn()) {
                    axios.get(`${process.env.BE_API_URL}/wishlist`, generateAxiosConfig())
                        .then(resWishlist => {
                            const wishlistedPlaces = resWishlist.data.data;
                            const resWithWishlist = res.data.data.data.map((place) => {
                                return {
                                    ...place,
                                    wishlist: wishlistedPlaces.some(e => e.id === place.id),
                                }
                            })
                            setData([
                                ...data,
                                ...resWithWishlist
                            ]);
                        })
                        .catch(err => {
                            console.log(err);
                            alert(JSON.stringify(err.res.data));
                        })
				} else {
					setData([
                        ...data,
                        ...res.data.data.data
                    ]);
				}
			})
			.catch(err => {
				console.log("err", err);
			})
    }

    return (
        <Layout>
            <main className="px-20 py-10">
                <h1 className="font-bold text-2xl md:text-3xl mb-4">
                    Explore Places
                </h1>
                <div className="flex flex-col lg:flex-row items-start">
                    <div className="w-full mb-10 lg:w-1/4">
                        <SearchEngine handleSearchSubmit={handleSearchSubmit} />
                    </div>
                    <div className="lg:w-3/4 ">
                        <div className="flex flex-row flex-wrap justify-center">
                            {data?.map((item, i) => (
                                <div key={i} className="w-full sm:w-auto sm:mx-5 mb-10">
                                    <CardExplore                                    
                                        id={item.id}                                    
                                        name={item.name}
                                        location={item.location}
                                        rating={item.rating}
                                        img_urls={item.img_urls[0]}
                                        isWishlishted={item.wishlist}
                                    />
                                </div>
                            ))}                        
                        </div>
                        {data.length % 9 === 0 && (
                            <button onClick={handleLoadMore} className="text-center m-auto block">Load more...</button>
                        )}
                    </div>
                </div>
            </main>
		</Layout>
	);
}
