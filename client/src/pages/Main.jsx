
/**
 * Pre-login Main page
 * */
import { Link } from "react-router-dom";
import '../assets/css/Main.css';

 

const Main = () => {

    return (
        <div className="main-page">
            <header>
                <h1>Notion Library</h1>
            </header>

            <hr />

            <main>

                
            </main>
            <div className="sign-in-prompt">
                <h3>Discover & Read More</h3>

                <Link to='/register' type="button">Sign Up</Link>

                <hr />

                <p>Already a member?</p>
                <Link style={{ marginBottom: '1em' }} to='/Login' type="button">Sign In</Link>
            </div>
        </div>
    );
};


export default Main;