const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Comments', function () {
  it('Should add and fetch successfully', async function () {
    const Comments = await ethers.getContractFactory('Comments');
    const comments = await Comments.deploy();
    await comments.deployed();

    expect(await comments.getComments('first-blog-post')).to.be.lengthOf(0);

    const Txn1 = await comments.addComment(
      'first-blog-post',
      'This is first first comment'
    );
    await Txn1.wait();

    expect(await comments.getComments('first-blog-post')).to.be.lengthOf(1);
    expect(await comments.getComments('second-blog-post')).to.be.lengthOf(0);

    const Txn2 = await comments.addComment(
      'second-blog-post',
      'This is a comment on second blog post'
    );
    await Txn2.wait();

    expect(await comments.getComments('first-blog-post')).to.be.lengthOf(1);
    expect(await comments.getComments('second-blog-post')).to.be.lengthOf(1);
  });
});
