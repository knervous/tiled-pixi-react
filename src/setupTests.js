import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import canvasSerializer from 'jest-canvas-snapshot-serializer';

expect.addSnapshotSerializer(canvasSerializer);