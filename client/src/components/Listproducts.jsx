import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { Button, Image } from 'react-bootstrap';
import DeletArticle from './DeleteArticle';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Listproducts = ({ produits }) => {
    const dispatch = useDispatch();
// console.log("produits from listproduct: "+produits)    
    const columns = useMemo(
    () => [
        {
            accessorKey: 'photo',
            header: 'Photo',
            Cell: ({ cell }) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    <Image
                        src={cell.getValue()}
                        alt="photo"
                        height="50"
                        width="50"
                    />
                </Box>
            ),
        },
        {
            accessorKey: 'title',
            header: 'Title',
            size: 100,
        },
        {
            accessorKey: 'categorie',
            header: 'Categorie',
            size: 100,
        },
        {
            accessorKey: 'description',
            header: 'Description',
            size: 100,
        },
        {
            accessorKey: 'price',
            header: 'Price',
            size: 100,
        },
        {
            accessorKey: '_id',
            header: 'Actions',
            size: 100,
            Cell: ({ row }) => {
                const item = row.original;

                if (!item) {
                    console.error('Item is undefined:', row);
                    return null;
                }

                return (
                    <div className="d-flex align-items-center gap-2">
                        <Button className='admin' variant="danger">
                            <DeletArticle item={item} />
                        </Button>
                        <Link to={`/update-art/${item._id}`}>
                            <Button className='admin' variant="warning">
                            <i class="bi bi-pencil-square"></i>
                            </Button>
                        </Link>
                    </div>
                );
            },
        },
    ],
    [produits]
);

    return (
        <div>
            <MaterialReactTable columns={columns} data={produits.list || []} />
        </div>
    );
};

export default Listproducts;
