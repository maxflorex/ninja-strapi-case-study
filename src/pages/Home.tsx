import { gql, useQuery } from '@apollo/client';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';


const REVIEWS = gql`
    query GetReviews {
        reviews {
            data {
                id
                attributes {
                    title
                    body
                    rating
                }
            }
        }
    }
`;

const Home: FC = () => {
    const { loading, error, data } = useQuery(REVIEWS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error 😭</p>;

    return (
        <div className="container mx-auto flex flex-col gap-8 p-4 rounded-sm">
            {data.reviews.data.map(({ attributes, id }: any, i: number) => (
                <div
                    key={i}
                    className="flex flex-col gap-2 bg-warm-gray-50 rounded-md py-8 pl-18 pr-8 relative"
                >
                    <div className="absolute -top-2 -left-2 bg-fuchsia-800 w-16 h-16 flex justify-center items-center text-4xl font-thin text-white">
                        {attributes.rating}
                    </div>
                    <h1 className="text-2xl font-semibold">
                        {attributes.title}
                    </h1>
                    <small>console list</small>
                    <p>{attributes.body.substring(0, 200)}...</p>
                    <Link to={`/details/${id}`}>Read More</Link>
                </div>
            ))}
        </div>
    );
};

export default Home;
