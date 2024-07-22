// frontend/my-app/src/app/__tests__/UploadImage.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import UploadImage from '../ImageUpload';

const mock = new MockAdapter(axios);

describe('UploadImage Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<UploadImage url="/upload" />);
    expect(getByText('Upload Image')).toBeInTheDocument();
  });

  it('handles file upload and shows progress', async () => {
    mock.onPost('/upload').reply(200, { url: 'https://example.com/generated-video.mp4' });

    const { getByText, getByLabelText, getByRole, queryByText } = render(<UploadImage url="/upload" />);

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const input = getByLabelText(/upload/i);
    fireEvent.change(input, { target: { files: [file] } });

    const uploadButton = getByText(/upload image/i);
    fireEvent.click(uploadButton);

    await waitFor(() => expect(getByText('Uploading...')).toBeInTheDocument());

    await waitFor(() => {
      expect(queryByText(/uploading/i)).not.toBeInTheDocument();
      expect(getByRole('video')).toBeInTheDocument();
      expect(getByText(/downloading is not allowed/i)).toBeInTheDocument();
    });
  });
});
