import React, { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser } from "../services/api";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

interface User {
    id: number;
    name: string;
    postCount: number;
}

const TopUsers: React.FC = () => {
    const [topUsers, setTopUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTopUsers = async () => {
            const users = await fetchUsers();
            const userPostCounts: { [key: number]: number } = {};

            const fetchAllPosts = Object.keys(users).map(async (id) => {
                const posts = await fetchPostsByUser(Number(id));
                userPostCounts[Number(id)] = posts.length;
            });

            await Promise.all(fetchAllPosts);

            const sortedUsers = Object.keys(users)
                .map((id) => ({
                    id: Number(id),
                    name: users[id],
                    postCount: userPostCounts[Number(id)] || 0,
                }))
                .sort((a, b) => b.postCount - a.postCount)
                .slice(0, 5);

            setTopUsers(sortedUsers);
            setLoading(false);
        };

        getTopUsers();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Top 5 Users
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                topUsers.map((user) => (
                    <Card key={user.id} style={{ marginBottom: "10px" }}>
                        <CardContent>
                            <Typography variant="h6">{user.name}</Typography>
                            <Typography variant="body2">
                                Posts: {user.postCount}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
};

export default TopUsers;
