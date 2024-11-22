import React, { useState } from 'react';
import type { Dayjs } from 'dayjs';
import { Calendar, Modal, Form, Input, Button, Select, TimePicker } from 'antd';
import './calender.css';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = TimePicker;

const App: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [events, setEvents] = useState<{ [key: string]: { detail: string, type: string, timeRange: [Dayjs, Dayjs] | null }[] }>({});
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('');
  const [timeRange, setTimeRange] = useState<[Dayjs, Dayjs] | null>(null);

  const handleCellClick = (value: Dayjs) => {
    setSelectedTime(value);
  };

  const handleAddEvent = () => {
    const date = selectedTime?.format('YYYY-MM-DD');
    if (date && input && select && timeRange) {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [date]: [...(prevEvents[date] || []), { detail: input, type: select, timeRange }],
      }));
      setInput('');
      setSelect('');
      setTimeRange(null);
    }
  };

  const handleRemoveEvent = (index: number) => {
    const date = selectedTime?.format('YYYY-MM-DD');
    if (date) {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [date]: prevEvents[date].filter((_, i) => i !== index),
      }));
    }
  };

  const dateCellRender = (value: Dayjs) => {
    const date = value.format('YYYY-MM-DD');
    const listData = events[date] || [];
    return (
      <div 
        onClick={() => handleCellClick(value)}
        style={{ height: '100%', cursor: 'pointer' }}
      >
        {listData.map((event, index) => (
          <div key={index}>
            {event.detail} ({event.type})
          </div>
        ))}
      </div>
    );
  };

  const renderForm = () => {
    const date = selectedTime?.format('YYYY-MM-DD');
    const listData = date ? events[date] || [] : [];

    return (
      selectedTime && (
        <Modal
          open={true}
          onCancel={() => setSelectedTime(null)}
          footer={null}
        >
          <h2>Selected Time: {selectedTime.format('YYYY-MM-DD HH:mm')}</h2>
          <Form>
            {listData.map((event, index) => (
              <div key={index}>
                <Form.Item label={`Event ${index + 1}`}>
                  <Input value={event.detail} disabled />
                  <Form.Item label='Type'>
                    <Select value={event.type} disabled>
                      <Option value="Type 1">Type 1</Option>
                      <Option value="Type 2">Type 2</Option>
                      {/* Add more options as needed */}
                    </Select>
                  </Form.Item>
                  <Form.Item label='Time Range'>
                    <RangePicker value={event.timeRange} disabled />
                  </Form.Item>
                  <Button onClick={() => handleRemoveEvent(index)}>Remove Event</Button>
                </Form.Item>
              </div>
            ))}
            <Form.Item label={`Event ${listData.length + 1}`}>
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter event details" />
            </Form.Item>
            <Form.Item label='Type'>
              <Select value={select} onChange={(value) => setSelect(value)} placeholder="Select event type">
                <Option value="Type 1">Type 1</Option>
                <Option value="Type 2">Type 2</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
            <Form.Item label='Time Range'>
              <RangePicker value={timeRange} onChange={(range) => setTimeRange(range)} />
            </Form.Item>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </Form>
        </Modal>
      )
    );
  };

  return (
    <>
      <Calendar cellRender={dateCellRender} />
      {renderForm()}
    </>
  );
};

export default App;
