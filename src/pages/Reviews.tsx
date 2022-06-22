import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

type Props = {};

const REVIEW = gql`
    query GetReview($id: ID!) {
        review(id: $id) {
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

const Reviews = (props: Props) => {
    const { id } = useParams();

    const { loading, error, data } = useQuery(REVIEW, {
        variables: { id: id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error 😭</p>;

    const { title, reviews, rating, body } = data.review.data.attributes;    

    return (
        <div className="flex flex-col gap-2 bg-warm-gray-50 rounded-md py-8 pl-18 pr-8 relative">
            <div className="absolute -top-2 -left-2 bg-fuchsia-800 w-16 h-16 flex justify-center items-center text-4xl font-thin text-white">
                {rating}
            </div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <small>console list</small>
            <p>{body}</p>
        </div>
    );
};

export default Reviews;
