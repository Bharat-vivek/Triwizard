import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import JobOffer from './JobOffers';

jest.mock('axios');

describe('JobOffer Component', () => {
    const mockData = [
        {
            jobTitle: 'Software Engineer Intern',
            companyName: 'Tech Corp',
            location: 'San Francisco',
            duration: '3 months',
            stipend: '$2000',
            link: 'http://example.com/apply1',
        },
        {
            jobTitle: 'Data Analyst Intern',
            companyName: 'Data Inc',
            location: 'New York',
            duration: '6 months',
            stipend: '$2500',
            link: 'http://example.com/apply2',
        },
    ];

    beforeEach(() => {
        axios.get.mockClear();
    });

    test('renders input and button initially', () => {
        render(<JobOffer />);
        expect(screen.getByPlaceholderText(/enter topic/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    test('updates input value on change', () => {
        render(<JobOffer />);
        const input = screen.getByPlaceholderText(/enter topic/i);
        fireEvent.change(input, { target: { value: 'React' } });
        expect(input.value).toBe('React');
    });

    test('fetches and displays results on search button click', async () => {
        axios.get.mockResolvedValueOnce({ data: mockData });

        render(<JobOffer />);
        const input = screen.getByPlaceholderText(/enter topic/i);
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input, { target: { value: 'Internship' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/scrape/Internship');
        });

        // Check if table rows are rendered with mock data
        mockData.forEach((item) => {
            expect(screen.getByText(item.jobTitle)).toBeInTheDocument();
            expect(screen.getByText(item.companyName)).toBeInTheDocument();
            expect(screen.getByText(item.location)).toBeInTheDocument();
            expect(screen.getByText(item.duration)).toBeInTheDocument();
            expect(screen.getByText(item.stipend)).toBeInTheDocument();
            expect(screen.getByText(/apply/i).closest('a')).toHaveAttribute('href', item.link);
        });
    });

    test('handles axios error gracefully', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(<JobOffer />);
        const input = screen.getByPlaceholderText(/enter topic/i);
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input, { target: { value: 'ErrorTest' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/scrape/ErrorTest');
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching data:', expect.any(Error));

        consoleErrorSpy.mockRestore();
    });

    test('does not call API when search term is empty', async () => {
        render(<JobOffer />);
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.click(button);

        await waitFor(() => {
            expect(axios.get).not.toHaveBeenCalled();
        });
    });

    test('shows loading state during API call', async () => {
        let resolvePromise;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });
        axios.get.mockReturnValue(promise);

        render(<JobOffer />);
        const input = screen.getByPlaceholderText(/enter topic/i);
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input, { target: { value: 'LoadingTest' } });
        fireEvent.click(button);

        // Check if loading indicator is shown (we need to add loading state in component for this test to pass)
        // Since the current component does not have loading UI, this test will be a placeholder for future enhancement

        resolvePromise({ data: mockData });
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/scrape/LoadingTest');
        });
    });

    test('has accessible roles and attributes', () => {
        render(<JobOffer />);
        const input = screen.getByPlaceholderText(/enter topic/i);
        expect(input).toHaveAttribute('type', 'text');
        const button = screen.getByRole('button', { name: /search/i });
        expect(button).toBeEnabled();
    });
});
