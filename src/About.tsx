import * as React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

import { Store } from './Store';

@observer(['store'])
export class About extends React.Component<{store: Store}, {}> {

    static fetchData(store: Store): Promise<never> {
        // simulate ajax call and update the store
        return new Promise((resolve) => {
            setTimeout(() => {
                store.counter = 10;
                resolve();
            }, 1 * 1000);
        });
    }

    render() {
        return (
            <div>
                This is the about page. {this.props.store.counter}
                <Link to="/">Home</Link>
            </div>
        );
    }

}
