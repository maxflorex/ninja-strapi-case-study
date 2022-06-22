import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

const CATEGORY = gql`
    query GetCategory($id: ID!) {
        category(id: $id) {
            data {
                id
                attributes {
                    name
                    reviews {
                        data {
                            attributes {
                                title
                                body
                                rating
                                categories {
                                    data {
                                        attributes {
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

type Props = {};

const Category = (props: Props) => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(CATEGORY, {
        variables: { id: id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error 😭</p>;

    const { attributes } = data.category.data;

    console.log(attributes.reviews.data);

    return (
        <div>
            <h1>{attributes.name}</h1>
            {attributes.reviews.data.map((data: any, i: number) => {
                const { title, body, categories, rating } = data.attributes;

                console.log(categories.data[0].attributes);

                return (
                    <div className="container mx-auto flex flex-col gap-8 p-4 rounded-sm">
                        <div
                            key={i}
                            className="flex flex-col gap-2 bg-warm-gray-50 rounded-md py-8 pl-18 pr-8 relative"
                        >
                            <div className="absolute -top-2 -left-2 bg-fuchsia-800 w-16 h-16 flex justify-center items-center text-4xl font-thin text-white">
                                {rating}
                            </div>
                            <h1 className="text-2xl font-semibold">{title}</h1>
                            <div className="flex gap-4">
                                {categories.data.map((data: any, i: number) => (
                                    <small key={i}>
                                        {data.attributes.name}
                                    </small>
                                ))}
                            </div>
                            <p>{body.substring(0, 200)}...</p>
                            <Link to={`/details/${id}`}>Read More</Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Category;
