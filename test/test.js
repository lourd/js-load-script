import loadScript from '../'

it('makes a script tag for the given URL', async () => {
  const fakeScriptEl = {}
  jest.spyOn(document, 'createElement').mockImplementation(() => fakeScriptEl)
  jest.spyOn(document.head, 'appendChild').mockImplementation(() => {})
  const url = 'foo.com'
  const loadPromise = loadScript(url)

  expect(document.createElement).toHaveBeenCalledWith('script')
  expect(document.head.appendChild).toHaveBeenCalledWith(fakeScriptEl)
  expect(fakeScriptEl).toMatchSnapshot()

  const loadResult = 'foo'
  fakeScriptEl.onload(loadResult)
  const res = await loadPromise
  expect(res).toEqual(loadResult)
  document.createElement.mockRestore()
  document.head.appendChild.mockRestore()
})

it('rejects the returned promise with whatever argument onerror is called with', async () => {
  const fakeScriptEl = {}
  jest.spyOn(document, 'createElement').mockImplementation(() => fakeScriptEl)
  jest.spyOn(document.head, 'appendChild').mockImplementation(() => {})
  const url = 'foo.com'
  const loadPromise = loadScript(url)

  const err = new Error('failure')
  fakeScriptEl.onerror(err)
  await expect(loadPromise).rejects.toEqual(err)
  document.createElement.mockRestore()
  document.head.appendChild.mockRestore()
})
