import type { Service } from "../types/survey.type";

interface ServicesAttainedProps {
  services: Service[];
  selectedServices: string[];
  onToggle: (serviceName: string) => void;
}

export default function ServicesAttained({
  services,
  selectedServices,
  onToggle,
}: ServicesAttainedProps) {
  return (
    <fieldset className="border border-gray-300 rounded-md p-4">
      <legend className="text-sm sm:text-md font-medium text-gray-700 px-3 sm:px-4 py-1 bg-gray-100 border border-gray-300 rounded-md">
        SERVICES ATTAINED
      </legend>
      <p className="text-sm text-gray-600 mb-3">
        Please check all services you have attained from this office/unit.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {services.map((service) => (
          <label key={service.name} className="flex items-start space-x-2">
            <input
              type="checkbox"
              value={service.name}
              checked={selectedServices.includes(service.name)}
              onChange={() => onToggle(service.name)}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">{service.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
