const should = require('should');

const zipcodes = require('../index');

describe('near()', () => {
  it('should find 5 zipcodes', (done) => {
    zipcodes.near('10453', 100000, { datafile: 'test/zipcodes.csv' })
      .then((res) => {
        res.length.should.be.equal(5);

        for (let i = 0; i < 5; i += 1) {
          res[i].should.be.equal(String(10451 + i));
        }
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should find 7 zipcodes near zipcode', (done) => {
    zipcodes.near('50453', 100000, { datafile: 'test/zipcodes.csv' })
      .then((res) => {
        res.length.should.be.equal(7);

        for (let i = 0; i < 7; i += 1) {
          res[i].should.be.equal(String(50451 + i));
        }
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should find 7 zipcodes near coordinates', (done) => {
    zipcodes.near({ latitude: 40.85, longitude: -77.80 }, 100000, { datafile: 'test/zipcodes.csv' })
      .then((res) => {
        res.length.should.be.equal(7);

        for (let i = 0; i < 7; i += 1) {
          res[i].should.be.equal(String(50451 + i));
        }
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should not find any zipcode', (done) => {
    zipcodes.near('90453', 100000, { datafile: 'test/zipcodes.csv' })
      .then((res) => {
        // we should not be here
        true.should.be.equal(false);
        done();
      })
      .catch((err) => {
        // we should be here
        should.ok(1);
        done()
      });
  });
});
