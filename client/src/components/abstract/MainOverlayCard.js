import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  margin: 10px 10px 0 10px;
  padding: 10px 10px 5px 10px;
  background-color: #f1f3f4;
  color: #777;
  font-weight: bold;
`;

const Title = styled.p`
  margin: 0 0 10px 0;
  padding-left: 20px;
  color: #777;
  font-weight: bold;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Image = styled.div`
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  width: ${({width}) => `${width}px`};
  height: ${({height}) => `${height}px`};
  border: 1px solid black;
`;

class MainOverlayCard extends React.Component {
    constructor(props) {
        super(props);
        this.state ={}
    }

    componentDidMount() {
    }

    render = () => {
        const {buttonValue, buttons} = this.state;
        const {title, data} = this.props;
        console.log(data);
        return <Card>
            <Title>{title}</Title>
            <ImageWrapper>
                {data.map(({cX, cY, sX, sY}) => {
                    return <Image width={sX} height={sY} style={{backgroundImage: `url(http://localhost/grassland_tiles.png)`, backgroundPosition: `-${cX}px -${cY}px`}}/>
                })}
            </ImageWrapper>
        </Card>;
    }

}

export default MainOverlayCard;
