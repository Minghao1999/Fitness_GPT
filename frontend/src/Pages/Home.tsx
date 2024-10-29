import {Box, Container} from "@mui/material";
import Hero from "../Components/Hero.tsx";
import Navbar from "../Components/common/Navbar.tsx";
import Footer from "../Components/common/Footer.tsx";

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