import {Box, Container} from "@mui/material";
import Hero from "../components/Hero.tsx";
import Navbar from "../components/common/Navbar.tsx";
import Footer from "../components/common/Footer.tsx";

const Home = () => {
    return(
        <Box sx={{bgcolor: 'black.main'}}>
            <Container>
                <Hero />
            </Container>
        </Box>
    )
}

export default Home