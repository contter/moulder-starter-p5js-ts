import {
  hexToRgb,
  rgbToHex,
  TabContainer,
  random,
  registerComponent, IMoulderProperty,
} from 'moulder';

export const colorComponent = () => {
  return {
    call: (state: any) => {
      state.mode = state.mode ?? 'rnd';
      const r = Math.floor(random().random() * 256);
      const g = Math.floor(random().random() * 256);
      const b = Math.floor(random().random() * 256);
      if (state.mode === 'rnd') {
        state.value = `rgb(${r}, ${g}, ${b})`;
      }
      if (state.mode === 'trnt') {
        state.value = 'transparent';
      }
      state.value = state.value ?? '#ffffff';
      return state.value;
    },
    render: (props: IMoulderProperty, setState: (state: any) => void) => {
      const { state } = props;
      return (
        <main className={'p-1'}>
          <h5 className={'text-sm'}>{props.name}</h5>
          <header>
            <TabContainer
              navs={[
                {
                  title: 'Random',
                  key: 'rnd',
                },
                {
                  title: 'Transparent',
                  key: 'trnt',
                },
                {
                  title: 'Custom',
                  key: 'cstm',
                },
              ]}
              mode={state.mode ?? 'dflt'}
              onChange={(mode) => {
                setState({ mode });
              }}
            />
          </header>

          {state.mode === 'rnd' ? <section className={'py-1'}></section> : null}

          {state.mode === 'trnt' ? (
            <section className={'py-1 text-xs'}></section>
          ) : null}

          {state.mode === 'cstm' ? (
            <section className={'py-1'}>
              <input
                className={
                  'input w-1/2 appearance-none input-bordered text-xs input-xs w-full'
                }
                value={
                  state.value.startsWith('rgb')
                    ? rgbToHex(state.value)
                    : state.value
                }
                onChange={(event) => {
                  const val = hexToRgb(event.target.value);
                  setState({ value: val });
                  // return setState(state, { array: _arr, out: val });
                }}
                type={'color'}
              />
            </section>
          ) : null}

          <div className={'text-xs'}>
            <h5 className={'flex items-center'}>
              Current:{' '}
              {state.value === 'transparent' ? (
                <b className={'ml-1'}>transparent</b>
              ) : (
                <>
                  <b
                    style={{ background: state.value }}
                    className={
                      'ml-1 w-3 h-3 inline-block font-medium rounded-sm'
                    }
                  />
                  <b className={'px-1 rounded-sm'}>
                    {state.value.startsWith('#')
                      ? hexToRgb(state.value)
                      : state.value}
                  </b>
                </>
              )}
            </h5>
          </div>

          <div className={'divider my-0'} />
        </main>
      );
    },
  };
};

registerComponent('color', colorComponent());

export const colorOptionComponent = () => {
  return {
    call: (state: any) => {
      state.mode = state.mode ?? 'rnd';
      const r = Math.floor(random().random() * 256);
      const g = Math.floor(random().random() * 256);
      const b = Math.floor(random().random() * 256);
      if (state.mode === 'rnd') {
        state.value = `rgb(${r}, ${g}, ${b})`;
      }
      state.value = state.value ?? '#ffffff';
      return state.value;
    },
    render: (props: IMoulderProperty, setState: (state: any) => void) => {
      const { state } = props;
      return (
        <main className={'p-1'}>
          <h5 className={'text-sm'}>{props.name}</h5>
          <header>
            <TabContainer
              navs={[
                {
                  title: 'Random',
                  key: 'rnd',
                },
                {
                  title: 'Custom',
                  key: 'cstm',
                },
              ]}
              mode={state.mode ?? 'dflt'}
              onChange={(mode) => {
                setState({ mode });
              }}
            />
          </header>

          {state.mode === 'rnd' ? <section className={'py-1'} /> : null}

          {state.mode === 'cstm' ? (
            <section className={'py-1'}>
              <input
                className={
                  'input w-1/2 appearance-none input-bordered text-xs input-xs w-full'
                }
                value={
                  state.value.startsWith('rgb')
                    ? rgbToHex(state.value)
                    : state.value
                }
                onChange={(event) => {
                  const val = hexToRgb(event.target.value);
                  setState({ value: val });
                  // return setState(state, { array: _arr, out: val });
                }}
                type={'color'}
              />
            </section>
          ) : null}

          <div className={'text-xs'}>
            <h5 className={'flex items-center'}>
              Current:{' '}
              <b
                style={{ background: state.value }}
                className={'ml-1 w-3 h-3 inline-block font-medium rounded-sm'}
              />
              <b className={'px-1 rounded-sm'}>
                {state.value.startsWith('#')
                  ? hexToRgb(state.value)
                  : state.value}
              </b>
            </h5>
          </div>

          <div className={'divider my-0'} />
        </main>
      );
    },
  };
};

registerComponent('colorOption', colorOptionComponent());

export const booleanCustomComponent = () => {
  return {
    call: (state: any) => {
      return state.value;
    },
    render: (props: IMoulderProperty, setState: (state: any) => void) => {
      const { state } = props;
      return (
        <main className={'p-1'}>
          <h5 className={'text-sm'}>{props.name}</h5>

          <section className={'py-1'}>
            <p className={'text-xs italic'}>{state.info}</p>
            <div className={'py-2'}>
              <div
                className={
                  'text-xs w-full flex justify-start gap-x-2 items-center'
                }
              >
                <div>Off</div>
                <input
                  checked={state.value}
                  type={'checkbox'}
                  onChange={(e) => {
                    setState({ value: e.target.checked });
                  }}
                  className={'toggle toggle-xs'}
                />
                <div>On</div>
              </div>
            </div>
          </section>

          <div className={'text-xs'}>
            <h5 className={'flex items-center'}>
              Current: <b className={'ml-1'}>{state.value}</b>
            </h5>
          </div>

          <div className={'divider my-0'} />
        </main>
      );
    },
  };
};

registerComponent('booleanCustom', booleanCustomComponent());
