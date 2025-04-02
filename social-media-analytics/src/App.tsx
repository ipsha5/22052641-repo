import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TopUsers from "./pages/TopUsers";
import TrendingPosts from "./pages/TrendingPosts";
import Feed from "./pages/Feed";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";

function App() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Social Media Analytics
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        Top Users
                    </Button>
                    <Button color="inherit" component={Link} to="/trending">
                        Trending Posts
                    </Button>
                    <Button color="inherit" component={Link} to="/feed">
                        Live Feed
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Routes>
                    <Route path="/" element={<TopUsers />} />
                    <Route path="/trending" element={<TrendingPosts />} />
                    <Route path="/feed" element={<Feed />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
