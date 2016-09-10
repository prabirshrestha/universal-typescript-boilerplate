import * as React from 'react';
import { Link } from 'react-router';

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                This is the home page.
                <Link to="/about">About</Link>
            </div>
        );
    }
}
