import React, { Component } from 'react';
import { Form, Input, Message, Button, Card, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Post from '../../ethereum/post';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class PredictForm extends Component {

  static async getInitialProps(props) {
      //Kickstarter model code:
      const post = Post(props.query.address);
      //const campaign = Campaign(props.query.address);

      summary = await post.methods.getSummary().call(); 
      
      return  {
        address: summary[0],
        name: summary[1],
        content: summary[2],
        yayprice: summary[3],
        nayprice: summary[4],
        pool: summary[5],
        yaycount: summary[6],
        naycount: summary[7],
      };

      // return  {
      //   address: '0x123',
      //   name: 'ElonMusk',
      //   content: 'Bitcoin price to cross $50,000 on Feb 26th.',
      //   yayprice: '0.01',
      //   nayprice: '0.01',
      //   pool: '26,234,231.12',
      //   yaycount: '202,312',
      //   naycount: '121,332',
      // };
    }

    state = {
        paymentPrice: this.props.yayprice,
        payingForYes: true,
        loadingyes: false,
        loadingNo: false,
        errorMessage: ''
    };

    //Write 2 function: onSubmitYes and onSubmitNo

    /* Kickstarter Model code:
    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        const campaign = Campaign(this.props.address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
              from: accounts[0],
              value: web3.utils.toWei(this.state.value, 'ether')
            });
            
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, value: '' })
    };
    */

    render () {
        return (
            <Layout><center>
            <Card>
              <Card.Content>
                <Card.Header>
                    <h3>
                      @{this.props.name}
                    </h3>
                </Card.Header>

                
                <Card.Description>
                  <strong>{this.props.content}</strong>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button disabled basic color='green'>
                    Yes: {this.props.yayprice} ETH
                  </Button>
                  <Button disabled basic color='red'>
                    No: {this.props.nayprice} ETH
                  </Button>
                </div>
                <br/>
                <br/>
                <div className='ui two buttons'>
                  <Button disabled basic color='green'>
                    Approvers: {this.props.yaycount}
                  </Button>
                  <Button disabled basic color='red'>
                    Disapprovers: {this.props.naycount}
                  </Button>
                </div>
              </Card.Content>
            </Card>
            
            <Form onSubmit={this.onSubmitYes} error={!!this.state.errorMessage} >
                <Message error  header="Oops!" content={this.state.errorMessage} />

                <Button.Group>
                  <Button loading={this.state.loadingYes}  animated color='green'>
                    <Button.Content visible>Predict Yes</Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow right' />
                    </Button.Content>
                  </Button>
                  <Button.Or text='  ' />
                  <Button disabled>Pay {this.props.yayprice} ETH</Button>
                </Button.Group>
            </Form>

            <br/>
         
            
            <Form onSubmit={this.onSubmitNo} error={!!this.state.errorMessage}>
                <Button.Group>
                <Button loading={this.state.loadingNo}  animated color='red'>
                    <Button.Content visible>Predict No</Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow right' />
                    </Button.Content>
                  </Button>
                  <Button.Or text='  ' />
                  <Button disabled >Pay {this.props.nayprice} ETH</Button>
                </Button.Group>
                </Form>
            </center>
            </Layout>
        );
    }
};

export default PredictForm;