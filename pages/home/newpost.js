import React, { Component } from 'react';
import { Form, Input, Message, Button, Card, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
// import { Link } from '../../routes';
import { Router } from '../../routes';
import factory from '../../ethereum/factory';

class PredictForm extends Component {

    state = {
        name:'',
        content:'',
        loading: false,
        errorMessage: ''
    };

    //Write 1 function: onSubmit

    // /* Kickstarter Model code:
    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            let deployedPosts = await factory.methods.getDeployedPosts().call();
            console.log("deployed posts:", deployedPosts);
            let createPostResult = await factory.methods.createPost(this.state.content, this.state.name).send({
              from: accounts[0]
            });
            console.log(createPostResult);
            
            Router.pushRoute('/home/feed');
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, name: '', content:'' })
    };
    // */

    render () {
        return (
            <Layout>
        
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
                    <Form.Field>
                        <Input
                        value={this.state.value}
                        label="Post as:"
                        labelPosition="left" 
                        onChange={event => this.setState({ name: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input
                        value={this.state.value}
                        label="Your Message:"
                        labelPosition="left" 
                        onChange={event => this.setState({ content: event.target.value })}
                        />
                    </Form.Field>

                    <Message error  header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>$ Post</Button>
                </Form>
         
          
            </Layout>
        );
    }
};

export default PredictForm;