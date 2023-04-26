import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Testing Motorcycles route', function () {
  it('If is possicle to create a new moto register', async function () {
    const input = {
      model: 'Kawasaki',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const output = {
      id: '6348513f34c397abcad040b2',
      model: 'Kawasaki',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    Sinon.stub(Model, 'create').resolves(output);

    const service = new MotorcycleService();
    const result = await service.createMotorcycle(input);

    expect(result).to.be.deep.equal(output);

    Sinon.restore();
  });
  
  it('Should list all Motorcycles', async function () {
    const input = {
      id: '634852326b35b59438fbea31',
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    };

    const output = [
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];
    Sinon.stub(Model, 'find').resolves([input]);
    
    const service = new MotorcycleService();
    const result = await service.getAllMoto();

    expect(result).to.be.deep.equal(output);

    Sinon.restore();
  });

  it('Should be return list with moto by id', async function () {
    const id = '634852326b35b59438fbea2f';

    const output = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Biz',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    Sinon.stub(Model, 'findById').resolves(output);

    const service = new MotorcycleService();
    const result = await service.getMotoById(id);

    expect(result).to.be.deep.equal(output);

    Sinon.restore();
  });

  it('Should do a update in motorcycle route', async function () {
    const id = '634852326b35b59438fbea2f';

    const input = {
      model: 'Honda Cb 600f Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const output = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };
    Sinon.stub(Model, 'findByIdAndUpdate').resolves({
      ...output });

    const service = new MotorcycleService();
    const result = await service.updateMoto(id, input);

    expect(result).to.be.deep.equal(output);

    Sinon.restore();
  });
});