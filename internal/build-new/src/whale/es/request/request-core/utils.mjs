function actualErrorRetryInterval(retriedCount) {
  if (retriedCount < 1) {
    return 0;
  }
  const baseTime = 1e3;
  const minCoefficient = 1;
  const maxCoefficient = 9;
  const coefficient = Math.floor(
    Math.random() * 2 ** Math.min(retriedCount, maxCoefficient) + minCoefficient
  );
  return baseTime * coefficient;
}

export { actualErrorRetryInterval };
//# sourceMappingURL=utils.mjs.map
