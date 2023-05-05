import { AbsoluteRoutingModule } from './absolute-routing.module';

describe('AbsoluteRoutingModule', () => {
  let absoluteRoutingModule: AbsoluteRoutingModule;

  beforeEach(() => {
    absoluteRoutingModule = new AbsoluteRoutingModule();
  });

  it('should create an instance', () => {
    expect(absoluteRoutingModule).toBeTruthy();
  });
});
