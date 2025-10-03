import ICAL from 'ical.js';

export interface ParsedEvent {
  summary: string;
  dtstart: Date;
  dtend: Date;
  location?: string;
  description?: string;
  timezone?: string;
}

export const parseICSFile = (icsContent: string): ParsedEvent[] => {
  try {
    const jcalData = ICAL.parse(icsContent);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');
    
    return vevents.map((vevent) => {
      const event = new ICAL.Event(vevent);
      
      return {
        summary: event.summary || 'Untitled Event',
        dtstart: event.startDate.toJSDate(),
        dtend: event.endDate.toJSDate(),
        location: event.location || undefined,
        description: event.description || undefined,
        timezone: event.startDate.zone?.tzid || undefined,
      };
    }).sort((a, b) => a.dtstart.getTime() - b.dtstart.getTime());
  } catch (error) {
    console.error('Error parsing ICS file:', error);
    throw new Error('Failed to parse ICS file. Please ensure it is a valid calendar file.');
  }
};
