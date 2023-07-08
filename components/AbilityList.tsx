import * as React from 'react';
import {Ability} from './PokemonDetails';
import AbilityListElement from './AbilityListElement';

type Props = {
  abilities: Ability[];
};

const AbilityList: React.FC<Props> = ({abilities}) => {
  return (
    abilities.length > 0 &&
    abilities.map((ability: Ability, index: number) => (
      <AbilityListElement key={index} ability={ability} />
    ))
  );
};

export default AbilityList;
