import Layout from "../../components/layout";
import dataMock from '../../mockPlaces.json';
import CardExplore from "../../components/elements/cardExplore";

export default function SubmittedPlaces() {
    const dataOri = dataMock.places;
    const data = [ ...dataOri, ...dataOri ];

    return (
        <Layout>
            <main className="px-10 py-10">
                <h1 className="font-bold text-2xl md:text-3xl mb-4">
                    Submitted Places
                </h1>
                <div className="flex flex-row flex-wrap">
                    {data.map((item, i) => (
                        <div className="w-full sm:w-auto sm:mr-5 mb-10">
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