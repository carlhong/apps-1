// Copyright 2017-2020 @polkadot/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TypeDef } from '@polkadot/types/types';
import { ParamDef } from '../types';

import { useEffect, useState } from 'react';
import { registry } from '@polkadot/react-api';
import { getTypeDef } from '@polkadot/types/create';

function expandDef (td: TypeDef): TypeDef {
  try {
    return getTypeDef(
      registry.createType(td.type as 'u32').toRawType()
    );
  } catch (e) {
    return td;
  }
}

export default function useParamDefs (type: TypeDef): ParamDef[] {
  const [params, setParams] = useState<ParamDef[]>([]);

  useEffect((): void => {
    const typeDef = expandDef(type);

    if (!typeDef.sub) {
      return setParams([]);
    }

    setParams(
      (Array.isArray(typeDef.sub) ? typeDef.sub : [typeDef.sub]).map((td): ParamDef => ({
        length: typeDef.length,
        name: td.name,
        type: td // expandDef(td)
      }))
    );
  }, [type]);

  return params;
}
