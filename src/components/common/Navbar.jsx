import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav>
            <div className="navbar bg-[#374151]">
                <div className="flex-1">
                    <Link to="/">
                        <li className="btn btn-ghost text-xl">
                            eVerse
                        </li>
                    </Link>
                </div>
                <div className="flex-none gap-4">
                    <Link to="/signup">
                        <div className="btn btn-ghost text-xl border-2 border-[#caced5]">
                            SignUp
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
