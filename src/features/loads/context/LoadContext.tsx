import { ColumnFilters, Load, SortOrder } from '@/types/load';
import { createContext, ReactNode, useContext, useState } from 'react';

type ModalState = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  loadToEdit?: Load | null;
};

type DeleteModalState = {
  isOpen: boolean;
  loadId: number | null;
};

interface LoadContextType {
  search: string;
  setSearch: (search: string) => void;

  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;

  sortKey: string;
  setSortKey: (key: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;

  columnFilters: ColumnFilters;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilters>>;

  clearFilters: () => void;

  modal: ModalState;
  openCreateModal: () => void;
  openEditModal: (load: Load) => void;
  closeModal: () => void;

  deleteModal: DeleteModalState;
  openDeleteModal: (id: number) => void;
  closeDeleteModal: () => void;
}

const LoadContext = createContext<LoadContextType | undefined>(undefined);

export const LoadProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('');

  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({
    status: [],
    origin: [],
    destination: [],
    client_name: [],
    carrier_name: []
  });

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    mode: 'create',
    loadToEdit: null
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    loadId: null
  });

  const clearFilters = () => {
    setColumnFilters({
      status: [],
      origin: [],
      destination: [],
      client_name: [],
      carrier_name: []
    });
    setSearch('');
    setPage(1);
  };

  const openCreateModal = () => setModal({ isOpen: true, mode: 'create', loadToEdit: null });

  const openEditModal = (load: Load) => setModal({ isOpen: true, mode: 'edit', loadToEdit: load });

  const closeModal = () => setModal({ isOpen: false, mode: 'create', loadToEdit: null });

  const openDeleteModal = (id: number) => {
    setDeleteModal({ isOpen: true, loadId: id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, loadId: null });
  };

  return (
    <LoadContext.Provider
      value={{
        search,
        setSearch,
        page,
        setPage,
        pageSize,
        setPageSize,
        sortKey,
        setSortKey,
        sortOrder,
        setSortOrder,
        columnFilters,
        setColumnFilters,
        clearFilters,
        modal,
        openCreateModal,
        openEditModal,
        closeModal,
        deleteModal,
        openDeleteModal,
        closeDeleteModal
      }}
    >
      {children}
    </LoadContext.Provider>
  );
};

export const useLoadContext = () => {
  const context = useContext(LoadContext);
  if (!context) {
    throw new Error('useLoadContext must be used within a LoadProvider');
  }
  return context;
};
