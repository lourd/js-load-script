import loadScript from '../index'

it('makes a script tag for the given URL', async () => {
  const fakeScriptEl = {
    // This will be overwritten by the call to loadScript
    onload: x => {},
  } as HTMLElement;
  const fakeNode = {} as Node;
  const createSpy = jest
    .spyOn(document, 'createElement')
    .mockImplementation(() => fakeScriptEl);
  const appendSpy = jest
    .spyOn(document.head, 'appendChild')
    .mockImplementation(() => fakeNode);
  const url = 'foo.com'
  const loadPromise = loadScript(url)

  expect(document.createElement).toHaveBeenCalledWith('script')
  expect(document.head.appendChild).toHaveBeenCalledWith(fakeScriptEl)
  expect(fakeScriptEl).toMatchSnapshot()

  fakeScriptEl.onload(new Event('foo'));
  const res = await loadPromise
  expect(res).toEqual(undefined)
  createSpy.mockRestore()
  appendSpy.mockRestore()
})

it('rejects the returned promise with whatever argument onerror is called with', async () => {
  const fakeScriptEl = {
    // This will be overwritten by the call to loadScript
    onerror: x => {},
  } as HTMLElement;
  const fakeNode = {} as Node;
  const createSpy = jest
    .spyOn(document, 'createElement')
    .mockImplementation(() => fakeScriptEl);
  const appendSpy = jest
    .spyOn(document.head, 'appendChild')
    .mockImplementation(() => fakeNode);
  const url = 'foo.com'
  const loadPromise = loadScript(url)

  const err = 'failure';
  fakeScriptEl.onerror(err)
  await expect(loadPromise).rejects.toEqual(err)
  createSpy.mockRestore()
  appendSpy.mockRestore()
})
