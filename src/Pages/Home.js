import React from 'react';
import {Col, Div, Row} from "atomize";
import {Link, useSearchParams} from "react-router-dom";
import AuthPage from "./Auth";

export default function HomePage(props) {
    const [query] = useSearchParams();
    if (query.get('uuid')) {
        return (
            <AuthPage/>
        );
    }

    return (
        <>
            <Div h={'100vh'}>
                <Row>
                    <Col size={{
                        xs: '12',
                        sm: '12',
                        md: '12',
                        lg: '6',
                        xl: '6'
                    }}>
                        <Div p="1rem" bg="warning500" h={{
                            xs: '50vh',
                            sm: '50vh',
                            md: '50vh',
                            lg: '100vh',
                            xl: '100vh'
                        }} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            Discord-Dashboard v3 Landing Page
                        </Div>
                    </Col>
                    <Col size={{
                        xs: '12',
                        sm: '12',
                        md: '12',
                        lg: '6',
                        xl: '6'
                    }}>
                        <Div p="1rem" bg="success500" h={{
                            xs: '50vh',
                            sm: '50vh',
                            md: '50vh',
                            lg: '100vh',
                            xl: '100vh'
                        }} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Link to={'/dashboard'}>Go to Dashboard</Link>
                        </Div>
                    </Col>
                </Row>
            </Div>
        </>
    );
}
