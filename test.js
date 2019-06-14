describe('Stock button click', function () {
  it('should display the first user on click', function () {
    $('#add-stock').trigger('click');
    generateAlert();
    expect(alert.callCount).to.equal(1);
    done();
  });
});
