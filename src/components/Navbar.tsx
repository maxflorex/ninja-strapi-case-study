import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

type Props = {};

const CATEGORIES = gql`
    query GetCategories {
        categories {
            data {
                id
                attributes {
                    name
                }
            }
        }
    }
`;

const Navbar = (props: Props) => {
    const { loading, error, data } = useQuery(CATEGORIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error 😭</p>;

    return (
        <>
            <Link
                to="/"
                className="flex flex-col items-center w-full justify-center py-16"
            >
                <h1 className="text-2xl font-semibold uppercase text-center text-fuchsia-900">
                    Ninja Reviews
                </h1>
            </Link>
            <nav className="flex justify-between p-4 mx-auto container no-underline pb-16">
                <h2>Category</h2>
                <div className="flex gap-2">
                    <span>Filter reviews by category:</span>
                    {data.categories.data.map((data: any) => (
                        <Link key={data.id} to={`/category/${data.id}`}>
                            <p>{data.attributes.name}</p>
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
