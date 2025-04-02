import React, { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser, fetchCommentsByPost } from "../services/api";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

interface Post {
    id: number;
    content: string;
    commentCount: number;
}

const TrendingPosts: React.FC = () => {
    const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTrendingPosts = async () => {
            const users = await fetchUsers();
            let posts: Post[] = [];

            const fetchAllPosts = Object.keys(users).map(async (id) => {
                const userPosts = await fetchPostsByUser(Number(id));
                for (let post of userPosts) {
                    const comments = await fetchCommentsByPost(post.id);
                    posts.push({
                        id: post.id,
                        content: post.content,
                        commentCount: comments.length,
                    });
                }
            });

            await Promise.all(fetchAllPosts);

            const maxComments = Math.max(...posts.map((post) => post.commentCount));
            setTrendingPosts(posts.filter((post) => post.commentCount === maxComments));
            setLoading(false);
        };

        getTrendingPosts();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Trending Posts
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                trendingPosts.map((post) => (
                    <Card key={post.id} style={{ marginBottom: "10px" }}>
                        <CardContent>
                            <Typography variant="body1">{post.content}</Typography>
                            <Typography variant="body2">
                                Comments: {post.commentCount}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
};

export default TrendingPosts;
