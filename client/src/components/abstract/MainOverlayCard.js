import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  margin: 10px 10px 0 10px;
  padding: 10px 10px 5px 10px;
  color: #777;
  font-weight: bold;
  background-color: #f1f3f4;
  box-shadow: ${({selected}) => selected ? '0 0 11px 2px rgba(34, 60, 80, 0.6) inset' : 'none'};
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
  background-image: ${({img}) => `url(http://localhost/${img}.png)`};
  border: 1px solid #bbbbbb;
  box-shadow: ${({selected}) => selected ? '0 0 5px 1px green inset' : 'none'};
  border: ${({selected}) => selected ? '1px solid green' : '1px solid #bbbbbb'};
`;

class MainOverlayCard extends React.Component {
    constructor(props) {
        super(props);
        this.state ={}
    }

    componentDidMount() {
    }

    render = () => {
        const {title, data, choiceFile, choiceGroup, choiceSubgroup, choiceItem, callback} = this.props;
        return <Card selected={title === choiceSubgroup} id={'choiceSubgroup'}>
            <Title>{title}</Title>
            <ImageWrapper>
                {data.map(({cX, cY, sX, sY}, index) => {
                    return <Image
                        selected={index === choiceItem && title === choiceSubgroup}
                        onClick={(event) => callback(event, title)}
                        id={index}
                        key={`image_${choiceGroup}_${index}`}
                        width={sX}
                        height={sY}
                        img={choiceFile}
                        style={{backgroundPosition: `-${cX}px -${cY}px`}}
                    />
                })}
            </ImageWrapper>
        </Card>;
    }

}

export default MainOverlayCard;
