const httpFactory = require('../../src/sharepoint/http/http-factory')

const http = httpFactory('https://mysite.na.xom.com/personal/sa_jmulle3')

describe('testing...', () => {
  it('should get data', async (done) => {
    const resp = await http.get('/_api/Lists/GetByTitle(\'xom-sharepoint-list-test\')', {})
    expect(resp).toEqual({
      data: {},
    })
    expect(http.get).toHaveBeenCalledWith({
      method: 'get',
      url: '/test',
    })
    expect(http.get).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy).not.toHaveBeenCalled()
    done()
  })
})
