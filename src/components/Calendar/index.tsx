"use client";

import styles from "@/app/page.module.sass";
import style from "./page.module.sass";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin, {
    Draggable,
    DropArg,
} from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState, Fragment } from "react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { EventSourceInput } from "@fullcalendar/core/index.js";

interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;
}

export function Calendar() {
    const [events, setEvents] = useState([{ title: "", id: 0 }]);
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const [newEvent, setNewEvent] = useState<Event>({
        title: "",
        start: "",
        allDay: false,
        id: 0,
    });

    function handleDateClick(arg: { date: Date; allDay: boolean }): void {
        setNewEvent({
            ...newEvent,
            start: arg.date,
            allDay: arg.allDay,
            id: new Date().getTime(),
        });
        setShowModal(true);
    }

    function addEvent(data: DropArg): void {
        const event = {
            ...newEvent,
            start: data.date.toISOString(),
            title: data.draggedEl.innerText,
            allDay: data.allDay,
            id: new Date().getTime(),
        };
        setAllEvents([...allEvents, event]);
    }

    function handleDeleteModal(data: { event: { id: string } }): void {
        setShowDeleteModal(true);
        setIdToDelete(Number(data.event.id));
    }

    function handleDelete() {
        setAllEvents(
            allEvents.filter((event) => Number(event.id) !== Number(idToDelete))
        );
        setShowDeleteModal(false);
        setIdToDelete(null);
    }

    function handleCloseModal() {
        setShowModal(false);
        setNewEvent({
            title: "",
            start: "",
            allDay: false,
            id: 0,
        });
        setShowDeleteModal(false);
        setIdToDelete(null);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setAllEvents([...allEvents, newEvent]);
        setEvents([...allEvents, newEvent]);
        setShowModal(false);
        setNewEvent({
            title: "",
            start: "",
            allDay: false,
            id: 0,
        });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setNewEvent({
            ...newEvent,
            title: e.target.value,
        });
    }

    useEffect(() => {
        let draggableEl = document.getElementById("draggable-el");
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function (eventEl) {
                    return {
                        title: eventEl.innerText,
                        id: String(new Date().getTime()),
                    };
                },
            });
        }
    }, []);

    return (
        <div className={style.calendarPage}>
            <div className={style.calendar}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "resourceTimelineWook, dayGridMonth,timeGridWeek",
                    }}
                    events={allEvents as EventSourceInput}
                    nowIndicator={true}
                    editable={true}
                    droppable={true}
                    selectable={true}
                    selectMirror={true}
                    dateClick={handleDateClick}
                    drop={(data) => addEvent(data)}
                    eventClick={(data) => handleDeleteModal(data)}
                />
            </div>
            <div id="draggable-el" className={`${style.arrastar}`}>
                <h3>Pacientes Agendados</h3>
                {events.map((event) => (
                    <div
                        key={event.id}
                        className={`fc-event ${style.evento}`}
                        data-event={JSON.stringify({ title: event.title, id: event.id })}
                    >
                        {event.title}
                    </div>
                ))}
            </div>
            <Transition show={showDeleteModal} as={Fragment}>
                <Dialog
                    as="div"
                    className={style.deleteModal}
                    onClose={setShowDeleteModal}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className={style.insideDeleteModal} />
                    </TransitionChild>

                    <div className={style.deleteModal}>
                        <div className={style.insideDeleteModal}>
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className={style.exclamation}>
                                                <ExclamationTriangleIcon
                                                    aria-hidden="true"
                                                    fill="#cdf031"
                                                />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <DialogTitle as="h4" className={style.dialogs}>
                                                    Apagar Agendamento
                                                </DialogTitle>
                                                <div className={style.dialogs}>
                                                    <p className="text-sm text-gray-500">
                                                        Tem certeza que deseja apagar esse agendamento?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.buttoms}>
                                        <button
                                            type="button"
                                            className={styles.btn}
                                            onClick={handleDelete}
                                        >
                                            Apagar
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.btn}
                                            onClick={handleCloseModal}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setShowModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <div className={style.deleteModal}>
                        <div className={style.insideDeleteModal}>
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className={style.check}>
                                            <CheckIcon
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className={style.dialogs}>
                                            <DialogTitle as="h3" className={style.dialogs}>
                                                Adicionar Agendamento
                                            </DialogTitle>
                                            <form action="submit" onSubmit={handleSubmit} className={style.form}>
                                                <div className={style.inputcontainer}>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        className={styles.input}
                                                        value={newEvent.title}
                                                        onChange={(e) => handleChange(e)}
                                                        placeholder="Title"
                                                    />
                                                </div>
                                                <div className={styles.createBtn}>
                                                    <button
                                                        type="submit"
                                                        className={styles.btn}
                                                        disabled={newEvent.title === ""}
                                                    >
                                                        Criar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={styles.btn}
                                                        onClick={handleCloseModal}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
